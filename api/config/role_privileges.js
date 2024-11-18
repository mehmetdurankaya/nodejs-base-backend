module.exports={
    privGroups:[
        {
            id:"USERS",
            name:"User Permissions"
        },
        {
            id:"ROLES",
            name:"Roles Permissions"
        },
        {
            id:"CATEGORIES",
            name:"Categories Permissions"
        },
        {
            id:"AUDITLOGS",
            name:"Auditlogs Permissions"
        }
    ],
    privileges:[
        {
            key:"user_view",
            name:"User view",
            group:"USERS",
            description:"User view"
        },
        {
            key:"user_add",
            name:"User Add",
            group:"USERS",
            description:"User add"
        },
        {
            key:"user_update",
            name:"User Update",
            group:"USERS",
            description:"User update"
        },
        {
            key:"user_delete",
            name:"User Delete",
            group:"USERS",
            description:"User delete"
        },
        {
            key:"roles_view",
            name:"Roles view",
            group:"ROLES",
            description:"Roles view"
        },
        {
            key:"roles_add",
            name:"Roles Add",
            group:"ROLES",
            description:"Roles add"
        },
        {
            key:"roles_update",
            name:"Roles Update",
            group:"ROLES",
            description:"Roles update"
        },
        {
            key:"roles_delete",
            name:"Roles Delete",
            group:"ROLES",
            description:"Roles delete"
        },
        {
            key:"category_view",
            name:"Category view",
            group:"CATEGORIES",
            description:"Category view"
        },
        {
            key:"category_add",
            name:"Category Add",
            group:"CATEGORIES",
            description:"Category add"
        },
        {
            key:"category_update",
            name:"Category Update",
            group:"CATEGORIES",
            description:"Category update"
        },
        {
            key:"category_delete",
            name:"Category Delete",
            group:"CATEGORIES",
            description:"Category delete"
        },
        {
            key:"audit_logs",
            name:"AuditLogs View ",
            group:"AUDITLOGS",
            description:"AuditLogs View"
        },
    
    ]
    
}