const MessageString = (text, date, itemType, label, result) => {    
    return [`Schedule has been successfully ${text} to your calendar `,
    `You have ${text} the following schedule item `,
    ` - Type: ${itemType} `,
    ` - ${label}: ${result}`,
    ` - Schedule Date: 
    ${new Intl.DateTimeFormat("en-GB", 
    {
        year: "numeric",
        month: "long",
        day: "2-digit"
    }).format(date)}`]
}

export default {
    MessageString
}