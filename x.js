//Trade Off between query performance vs consistency

//Using References (Normalization) ->consistency
let author = {}
let course = {
  author: 'id'
}
//Using Embeded Document (DeNormalization) ->performance
let course = {
  author: {
    name: 'Adi'
  }
}

//Hybrid
let author = {
  name: 'Adi'
  //50 other properties
}
let course = {
  author: {
    id: 'ref',
    name: 'Adi'
  }
}
