POST _scripts/template_search_actors
{
    "script":{
        "lang": "mustache",
        "source":{
            "query":{
                "match":{
                    "fields.actors":"{{actor}}"
                }
            }
        },
        "params":{
            "actor":"Harrison"
        }
    }
}

GET movies/_search/template
{
    "id":"template_search_actors",
    "params":{
        "actor": "Leonardo"
    }
}