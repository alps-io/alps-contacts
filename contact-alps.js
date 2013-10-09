{ "alps" :
    {
        "version" : "1.0",
        "doc" : {
            "format" : "text", 
            "value" : "List of contacts w/ search"
        },
        "descriptor" : [
            {
                "id" : "search",
                "type" : "safe",
                "rt" : "contacts",
                "doc" : {
                    "format" : "text",
                    "value" : "search for contacts in the list"
                },
                "descriptor" : [
                    {
                        "id" : "name",
                        "type" : "semantic",
                        "doc" : {
                            "format" : "text",
                            "value" : "input for searching"
                        }
                    }
                ]
            },
            {
                "id" : "contacts",
                "type" : "semantic",
                "doc" : {
                    "format" : "text",
                    "value" : "contact item"
                },
                "descriptor" : [
                    {
                        "id" : "link",
                        "type" : "safe",
                        "doc" : {
                            "format" : "text",
                            "value" : "link to contact"
                        }
                    },
                    {
                        "id" : "givenName",
                        "type" : "semantic",
                        "href" : "http://schema.org/givenName"
                    },
                    {
                        "id" : "familyName",
                        "type" : "semantic",
                        "href" : "http://schema.org/familyName"
                    },
                    {
                        "id" : "email",
                        "type" : "semantic",
                        "href" : "http://schema.org/email"
                    },
                    {
                        "id" : "telephone",
                        "type" : "semantic",
                        "href" : "http://schema.org/telephone"
                    }
                ]
            }
        ]
    }
}