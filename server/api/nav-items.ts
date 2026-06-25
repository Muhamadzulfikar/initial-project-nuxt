export default defineEventHandler(async (event) => {
    const method = getMethod(event);

    if (method == "GET") {
        return [
            {
                label: 'Dashboard',
                icon: 'i-lucide-pie-chart',
                to: '/'
            },
            {
                label: 'Datatable',
                icon: 'i-lucide-table',
                to: '/datatable'
            },
            {
                label: 'Settings',
                icon: 'i-lucide-settings',
                children: [
                    {
                        label: 'Navigation',
                        icon: 'i-lucide-map',
                        to: ''
                    },
                    {
                        label: 'Roles',
                        icon: 'i-lucide-lock',
                        to: ''
                    },
                    {
                        label: 'Logging',
                        icon: 'i-lucide-clock',
                        to: ''
                    },
                    {
                        label: 'Config',
                        icon: 'i-lucide-database',
                        to: '',
                    }
                ],
            },
        ]
    }
});
