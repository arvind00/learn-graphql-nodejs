exports.TECHNOLOGY_LIST = [
    { id: 'T1001', name: 'Angular', description: 'The modern web developer\'s platform' },
    { id: 'T1002', name: 'React', description: 'A JavaScript library for building user interfaces' },
    { id: 'T1003', name: 'Vue', description: 'The Progressive JavaScript Framework' }
];

exports.EMPLOYEE_LIST = [
    { id: 'E1001', firstName: 'Arvindchand', lastName: 'Lairenjam', jobLevel: 4, companyId: 'C1001', technologyIds: [1001, 1002] },
    { id: 'E1002', firstName: 'Vishal', lastName: 'Nag', jobLevel: 3, companyId: 'C1001', technologyIds: [1002, 1003] },
];

exports.COMPANY_LIST = [
    {id: 'C1001', name: 'Infosys Ltd'},
    {id: 'C1002', name: 'Theorem'},
    {id: 'C1003', name: 'Lasren & Turbo'},
]