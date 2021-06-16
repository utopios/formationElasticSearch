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


//Correction Agrégations
//Question 1
GET movies/_search
{
    "size":0,
    "aggs":{
        "note_moyenne":{
            "avg":{"field":"fields.rating"}
        }
    }
}

//Question 2
GET movies/_search
{
    "size":0,
    "query":{
        "match_phrase":{
            "fields.directors": "George Lucas"
        }
    },
    "aggs":{
        "note_moyenne":{
            "avg":{"field":"fields.rating"}
        },
        "rank_moyen":{
            "avg":{"field": "fields.rank"}
        }
    }
}
//Question 3

GET movies/_search
{
    "size": 0,
    // "query": {
    //     "match_phrase": {
    //         "fields.directors": "George Lucas"
    //     }
    // },
    "aggs": {
        "par_annee": {
            "terms": {
                "field": "fields.year"
            },
            "aggs": {
                "note_moyenne": {
                    "avg": {
                        "field": "fields.rating"
                    }
                }
            }
        }
    }
}
//Question 4
GET movies/_search
{
    "size": 0,
    // "query": {
    //     "match_phrase": {
    //         "fields.directors": "George Lucas"
    //     }
    // },
    "aggs": {
        "par_annee": {
            "terms": {
                "field": "fields.year"
            },
            "aggs": {
                "note_moyenne": {
                    "avg": {
                        "field": "fields.rating"
                    }
                },
                "note_min":{
                    "min":{
                        "field": "fields.rating"
                    }
                },
                "note_max":{
                    "max":{
                        "field": "fields.rating"
                    }
                }
            }
        }
    }
}

//Question 5
GET movies/_search
{
    "size": 0,
    "aggs": {
        "par_annee": {
            "terms": {
                "field": "fields.year",
                "order":{"rank_moyen":"desc"}
            },
            "aggs": {
                "rank_moyen": {
                    "avg": {
                        "field": "fields.rank"
                    }
                }
            }
        }
        
    }
    // "sort": {
    //     "fields.year": "asc"
    // }
}


//Question 6
GET movies/_search
{
    "size":0,
    "aggs":{
        "range_rating":{
            "range":{
                "field":"fields.rating",
                "ranges":[
                    {"from":0, "to":1.9},
                    {"from":2, "to":3.9},
                    {"from":4, "to":5.9},
                    {"from":6, "to":7.9}
                ]
            }
        }
    }
}

//Question

GET movies/_search
{
    "size": 0,
    "aggs": {
        "par_genres": {
            "terms": {
                "field": "fields.genres.keyword"
            }
        }
    }
}