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

//Exemple agrégation

GET movies/_search
{
    "size":0,
    "query": {
        "bool": {
            "should": [
                {
                    "match_phrase": {
                        "fields.actors": "Harrison Ford"
                    }
                }
            ]
        }
    },

    "aggs":{
        "aggs_par_annee":{
            "terms":{
                "field":"fields.year"
            }
        }
    }
}