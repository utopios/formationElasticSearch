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


GET movies/_search
{
    "query": {
        "bool": {
            "should": [
                {
                    "match": {
                        "fields.title": {
                            "query" : "Star Wars",
                            "operator" : "and"
                        }
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
    "query": {
        "bool": {
            "should": [
                {
                    "match": {
                        "fields.actors": "Harrison Ford"
                    }
                }
            ]
        }
    }
}

//Réponse question 2

GET movies/_search
{
    "query": {
        "bool": {
            "must": [
                {
                    "match": {
                        "fields.actors": "Harrison Ford"
                    }
                },
                {
                    "match": {
                        "fields.plot": "Jones"
                    }
                }
            ]
        }
    }
}

//Réponse question 5
GET movies/_search
{
    "query": {
        "bool": {
            "should": [
                {
                    "match_phrase": {
                        "fields.directors": "James Cameron"
                    }
                },
                {
                    "range": {
                        "fields.rank": {
                            "lt": 1000
                        }
                    }
                }
            ]
        }
    }
}

GET movies/_search
{
    "query": {
        "bool": {
            "must": [
                {
                    "match_phrase": {
                        "fields.directors": "James Cameron"
                    }
                },
                {
                    "range": {
                        "fields.rank": {
                            "lt": 400
                        }
                    }
                }
            ]
        }
    }
}

GET movies/_search
{
    //Pour garder uniquement le champ fields.title dans le résultat
    "_source":{
        "includes":["fields.title"]
    },
    "query": {
        "bool": {
            "must":[
                {
                    "match_phrase":{
                        "fields.directors":"J.J. Abrams"
                    }
                },
                {
                    "range":{
                        "fields.release_date":{
                            "from": "2010-01-01",
                            "to": "2015-12-31"
                        }
                    }
                    
                }
            ]
        }
    },
    "sort":{
        "fields.genres.keyword":"asc"
    } 
}