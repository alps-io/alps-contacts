/* 
    sample ALPS server implementation
    2013-07
    
    show using ALPS document drive 
    mapping of internal data model to ALPS "magic strings"
    and creating a representation in collection+json/
*/
var http = require('http');
var port = process.env.PORT||1337;
var base = "http://alps.mamund.c9.io";

// handle requests
function handler(req, res) {
    applyMap();
    res.writeHead(200, {"content-type":"application/json"});
    res.end(JSON.stringify(template));
    res.end("{}");
}

// use internal semantic map
function applyMap() {
    var i, x, item, v, p, desc, j, y;
    
    // apply data elements
    template.collection.items = [];    
    for(i=0, x=data.people.length; i<x; i++) {
        item = {};
        item.href = base + '/contacts/' + data.people[i].id;
        item.data = [];
        
        for(p in data.people[i]) {
            v = matchMap(p);
            if(v!==null) {
                item.data.push({"name" : v, "value" : data.people[i][p]});
            }
        }
        template.collection.items.push(item);
    }

    // apply transition elements
    template.collection.queries = [];
    for(i=0, x=alps.alps.descriptor.length; i<x; i++) {
        desc = alps.alps.descriptor[i];
        if(desc.type==='safe') {
            item = {};
            item.rt = desc.rt;
            item.rel = desc.id;
            item.href = base+'/search';
            item.data = [];
            for(j=0, y=desc.descriptor.length; j<y; j++) {
                item.data.push({"name" : desc.descriptor[j].id, "value" : ""});
            }
            template.collection.queries.push(item);
        }
        if(desc.type==='unsafe') {
            // todo
        }
        if(desc.type==='idempotent') {
            // todo
        }
    }

}

function matchMap(p) {
    var i, x, rtn;
    
    rtn = null;
    for(i=0, x=map.length; i<x; i++) {
        if(map[i].local===p) {
            rtn = map[i].shared;
            break;
        }
    }
    
    return rtn;
}

// start listening
http.createServer(handler).listen(port);

// ********************************************************
// DATA
// ********************************************************

// stored data model
// usually at some external location
var data = { "people" :
    [
        {
            "id" : "q1w2e3r4",
            "firstName" : "Mike",
            "lastName" : "Amundsen",
            "primaryEmail" : "mamund@yahoo.com",
            "voicePhone" : "123-456-7890"
        },
        
        {
            "id" : "p0o9i8u7",
            "firstName" : "Mark",
            "lastName" : "Gunderson",
            "primaryEmail" : "mgunder@example.com",
            "voicePhone" : "234-567-8901"
        }
    ]
};

// response representation (Cj) 
var template = { "collection" : 
    {
        "links" : [
            {
                "href" : base+"/contact-alps.xml", 
                "rel" : "profile"
            }
        ],
        
        "items" : [],
        
        "queries" : [
            {
                "rt" : "contacts",
                "rel" : "search", 
                "href" : base+"/search", 
                "data" : [
                    {
                        "name" : "name", 
                        "value" : "", 
                        "prompt" : "Search"
                    }
                ]
            }
        ]
    }
};

// map info
// might be in a config
var map = [
    {"local" : "firstName", "shared" : "givenName"},
    {"local" : "lastName", "shared" : "familyName"},
    {"local" : "primaryEmail", "shared" : "email"},
    {"local" : "voicePhone", "shared" : "telephone"}
];

// alps model
// usually read from external location
var alps = { "alps" :
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
                        "id" : "item",
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
};

// ******************************************
// DEAD CODE
// ******************************************
// hand-roll the mapping this time
function mapTheData() {
    var i,x, item;
    
    template.collection.items = [];
    for(i=0, x=data.people.length; i<x;i++) {
        item = {};
        item.href = base+'/contacts/'+data.people[i].id;
        item.data = [];
        
        item.data.push({"name" : "givenName", "value" : data.people[i].firstName});
        item.data.push({"name" : "familyName", "value" : data.people[i].lastName});
        item.data.push({"name" : "email", "value" : data.people[i].primaryEmail});
        item.data.push({"name" : "telephone", "value" : data.people[i].voicePhone});

        template.collection.items.push(item);
    }
}