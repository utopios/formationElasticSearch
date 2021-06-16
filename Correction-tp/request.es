//Réponse question 1
GET movies/_search
{
    "query": {
        "bool": {
            "should": [
                {
                    "match": {
                        "fields.title": "Star Wars"
                    }
                },
                {
                    "match": {
                        "fields.directors": "George Lucas"
                    }
                }
            ]
        }
    }
}

//Réponse question 2
GET movies/_search
{
    "query":{
        "match":{
            "fields.actors": "Harrison Ford"
            }
        }
    }
}

