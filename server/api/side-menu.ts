export default defineEventHandler(async (event) => {
    const method = getMethod(event);

    if (method == "GET") {
        return [
            {
                label: 'Inbox',
                icon: 'i-lucide-inbox',
                to: '/datatable'
            },
            {
                label: 'Issues',
                icon: 'i-lucide-square-dot',
                to: '/datatable'
            },
            {
                label: 'Activity',
                icon: 'i-lucide-square-activity',
                to: '/datatable'
            },
            {
                label: 'Settings',
                icon: 'i-lucide-settings',
                children: [
                    {
                        label: 'General',
                        icon: 'i-lucide-house',
                        to: '/datatable'
                    },
                    {
                        label: 'Team',
                        icon: 'i-lucide-users',
                        to: '/datatable'
                    },
                    {
                        label: 'Billing',
                        icon: 'i-lucide-credit-card',
                        to: '/datatables',
                    }
                ],
            },
        ]
    }
});
