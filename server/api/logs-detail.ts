import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { useLogger } from 'evlog'

function formatTimestamp(ts: string): string {
    return new Date(ts).toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    }).replace(',', '')
}

export default defineEventHandler(async (event) => {
    const log = useLogger(event)
    const query = getQuery(event)
    const filename = query.filename as string
    const level = query.level as string

    if (!filename) {
        throw createError({ status: 400, message: 'filename is required' })
    }

    if (!['info', 'error', 'warning'].includes(level)) {
        throw createError({ status: 400, message: 'level must be info, error, or warning' })
    }

    const logsDir = join(process.cwd(), '.evlog/logs')
    const filePath = join(logsDir, filename)

    const content = await readFile(filePath, 'utf-8')
    const lines = content.trim().split('\n')
    const logs: any[] = []

    for (const line of lines) {
        if (line.trim()) {
            try {
                const logEntry = JSON.parse(line)
                if (logEntry.level === level) {
                    logs.push({
                        ...logEntry,
                        formattedTime: formatTimestamp(logEntry.timestamp)
                    })
                }
            } catch (err) {
                log.warn(`Failed to parse log line: ${err instanceof Error ? err.message : String(err)}`)
            }
        }
    }

    logs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

    return {
        data: logs,
        count: logs.length
    }
})