import { readdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { useLogger } from 'evlog'

function formatTimestampAgo(ts: string): string {
    const now = Date.now()
    const diff = now - new Date(ts).getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
    return 'just now'
}

export default defineEventHandler(async (event) => {
    const log = useLogger(event)
    const query = getQuery(event)

    const page = parseInt(query.page as string) || 1
    const pageSize = parseInt(query.pageSize as string) || 10

    const logsDir = join(process.cwd(), '.evlog/logs')
    const files = await readdir(logsDir)
    const jsonlFiles = files.filter(f => f.endsWith('.jsonl')).sort().reverse()

    const fileStats: Record<string, any>[] = []

    for (const file of jsonlFiles) {
        const content = await readFile(join(logsDir, file), 'utf-8')
        const lines = content.trim().split('\n')

        let total_info = 0
        let total_error = 0
        let total_warning = 0
        let latestTimestamp: string | null = null

        for (const line of lines) {
            if (line.trim()) {
                try {
                    const logEntry = JSON.parse(line)
                    if (logEntry.level === 'info') total_info++
                    else if (logEntry.level === 'error') total_error++
                    else if (logEntry.level === 'warning') total_warning++

                    if (!latestTimestamp || new Date(logEntry.timestamp) > new Date(latestTimestamp)) {
                        latestTimestamp = logEntry.timestamp
                    }
                } catch (err) {
                    log.warn(`Failed to parse log line: ${err instanceof Error ? err.message : String(err)}`)
                }
            }
        }

        fileStats.push({
            filename: file,
            latest_timestamp_ago: latestTimestamp ? formatTimestampAgo(latestTimestamp) : null,
            total_info,
            total_error,
            total_warning
        })
    }

    const total = fileStats.length
    const start = (page - 1) * pageSize
    const data = fileStats.slice(start, start + pageSize)

    return {
        data,
        total,
        page,
        pageSize
    }
})
