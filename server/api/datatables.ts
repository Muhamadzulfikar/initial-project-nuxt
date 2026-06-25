const mockData = [
    { id: '4600', date: '2024-03-11T15:30:00', status: 'paid', email: 'james.anderson@example.com', amount: 594 },
    { id: '4599', date: '2024-03-11T10:10:00', status: 'failed', email: 'mia.white@example.com', amount: 276 },
    { id: '4598', date: '2024-03-11T08:50:00', status: 'refunded', email: 'william.brown@example.com', amount: 315 },
    { id: '4597', date: '2024-03-10T19:45:00', status: 'paid', email: 'emma.davis@example.com', amount: 529 },
    { id: '4596', date: '2024-03-10T15:55:00', status: 'paid', email: 'ethan.harris@example.com', amount: 639 },
    { id: '4595', date: '2024-03-10T12:30:00', status: 'failed', email: 'olivia.martin@example.com', amount: 412 },
    { id: '4594', date: '2024-03-10T08:15:00', status: 'paid', email: 'sophia.clark@example.com', amount: 728 },
    { id: '4593', date: '2024-03-09T22:00:00', status: 'refunded', email: 'liam.lewis@example.com', amount: 189 },
    { id: '4592', date: '2024-03-09T18:30:00', status: 'paid', email: 'ava.walker@example.com', amount: 567 },
    { id: '4591', date: '2024-03-09T14:20:00', status: 'paid', email: 'noah.allen@example.com', amount: 334 },
    { id: '4590', date: '2024-03-09T10:05:00', status: 'failed', email: 'isabella.young@example.com', amount: 445 },
    { id: '4589', date: '2024-03-08T21:45:00', status: 'paid', email: 'benjamin.king@example.com', amount: 892 },
    { id: '4588', date: '2024-03-08T17:30:00', status: 'refunded', email: 'charlotte.wright@example.com', amount: 221 },
    { id: '4587', date: '2024-03-08T13:15:00', status: 'paid', email: 'jacob.scott@example.com', amount: 673 },
    { id: '4586', date: '2024-03-08T09:00:00', status: 'paid', email: 'amelia.green@example.com', amount: 498 },
    { id: '4585', date: '2024-03-07T20:30:00', status: 'failed', email: 'mason.baker@example.com', amount: 756 },
    { id: '4584', date: '2024-03-07T16:45:00', status: 'paid', email: 'harper.adams@example.com', amount: 312 },
    { id: '4583', date: '2024-03-07T12:20:00', status: 'refunded', email: 'elijah.hall@example.com', amount: 587 },
    { id: '4582', date: '2024-03-07T08:10:00', status: 'paid', email: 'evelyn.turner@example.com', amount: 434 },
    { id: '4581', date: '2024-03-06T22:55:00', status: 'paid', email: 'logan.phillips@example.com', amount: 921 },
    { id: '4580', date: '2024-03-06T18:40:00', status: 'failed', email: 'abigail.campbell@example.com', amount: 267 },
    { id: '4579', date: '2024-03-06T14:25:00', status: 'paid', email: 'alexander.mitchell@example.com', amount: 543 },
    { id: '4578', date: '2024-03-06T10:10:00', status: 'refunded', email: 'emily.roberts@example.com', amount: 678 },
    { id: '4577', date: '2024-03-05T21:35:00', status: 'paid', email: 'mateo.carter@example.com', amount: 789 },
    { id: '4576', date: '2024-03-05T17:20:00', status: 'paid', email: 'ella.lee@example.com', amount: 456 },
    { id: '4575', date: '2024-03-05T13:05:00', status: 'failed', email: 'sebastian.jones@example.com', amount: 321 },
    { id: '4574', date: '2024-03-05T09:50:00', status: 'paid', email: 'scarlett.wilson@example.com', amount: 654 },
    { id: '4573', date: '2024-03-04T23:15:00', status: 'refunded', email: 'william.moore@example.com', amount: 432 },
    { id: '4572', date: '2024-03-04T19:00:00', status: 'paid', email: 'grace.taylor@example.com', amount: 876 },
    { id: '4571', date: '2024-03-04T14:45:00', status: 'paid', email: 'jack.anderson@example.com', amount: 543 },
    { id: '4570', date: '2024-03-04T10:30:00', status: 'failed', email: 'lily.thomas@example.com', amount: 209 },
    { id: '4569', date: '2024-03-03T22:10:00', status: 'paid', email: 'thomas.jackson@example.com', amount: 687 },
    { id: '4568', date: '2024-03-03T18:55:00', status: 'refunded', email: 'sophie.white@example.com', amount: 354 },
    { id: '4567', date: '2024-03-03T14:40:00', status: 'paid', email: 'daniel.harris@example.com', amount: 932 },
    { id: '4566', date: '2024-03-03T10:25:00', status: 'paid', email: 'chloe.martin@example.com', amount: 478 },
    { id: '4565', date: '2024-03-02T21:00:00', status: 'failed', email: 'henry.garcia@example.com', amount: 567 },
    { id: '4564', date: '2024-03-02T17:45:00', status: 'paid', email: 'zoe.lewis@example.com', amount: 823 },
    { id: '4563', date: '2024-03-02T13:30:00', status: 'refunded', email: 'owen.walker@example.com', amount: 234 },
    { id: '4562', date: '2024-03-02T09:15:00', status: 'paid', email: 'nora.clark@example.com', amount: 645 },
    { id: '4561', date: '2024-03-01T20:50:00', status: 'paid', email: 'sam.robinson@example.com', amount: 712 },
    { id: '4560', date: '2024-03-01T16:35:00', status: 'failed', email: 'addison.allen@example.com', amount: 398 },
    { id: '4559', date: '2024-03-01T12:20:00', status: 'paid', email: 'aria.young@example.com', amount: 534 },
    { id: '4558', date: '2024-03-01T08:05:00', status: 'refunded', email: 'luke.king@example.com', amount: 821 },
    { id: '4557', date: '2024-02-29T23:40:00', status: 'paid', email: ' Evelyn.wright@example.com', amount: 467 },
    { id: '4556', date: '2024-02-29T19:25:00', status: 'paid', email: 'carter.scott@example.com', amount: 293 },
    { id: '4555', date: '2024-02-29T15:10:00', status: 'failed', email: 'layla.green@example.com', amount: 586 },
    { id: '4554', date: '2024-02-29T10:55:00', status: 'paid', email: 'jayden.hall@example.com', amount: 719 },
    { id: '4553', date: '2024-02-28T22:30:00', status: 'refunded', email: ' Ellie.turner@example.com', amount: 842 },
    { id: '4552', date: '2024-02-28T18:15:00', status: 'paid', email: 'connor.phillips@example.com', amount: 375 },
    { id: '4551', date: '2024-02-28T14:00:00', status: 'paid', email: ' Hannah.campbell@example.com', amount: 628 },
]

export default defineEventHandler(async (event) => {
    const method = getMethod(event);

    if (method === "GET") {
        const query = getQuery(event)

        const page = parseInt(query.page as string) || 1
        const pageSize = parseInt(query.pageSize as string) || 10
        const search = (query.search as string || '').toLowerCase()
        const sortBy = query.sortBy as string | null
        const sortOrder = query.sortOrder as 'asc' | 'desc' || 'asc'

        let filtered = [...mockData]

        // Search filter
        if (search) {
            filtered = filtered.filter(row =>
                Object.values(row).some(val =>
                    String(val).toLowerCase().includes(search)
                )
            )
        }

        // Sort
        if (sortBy) {
            filtered.sort((a: any, b: any) => {
                let valA = a[sortBy]
                let valB = b[sortBy]

                if (typeof valA === 'string') {
                    valA = valA.toLowerCase()
                    valB = valB.toLowerCase()
                }

                if (valA < valB) return sortOrder === 'asc' ? -1 : 1
                if (valA > valB) return sortOrder === 'asc' ? 1 : -1
                return 0
            })
        }

        const total = filtered.length
        const start = (page - 1) * pageSize
        const data = filtered.slice(start, start + pageSize)

        return {
            data,
            total,
            page,
            pageSize
        }
    }
})
