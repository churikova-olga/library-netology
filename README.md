В файле README.md написать следующие запросы для MongoDB:


*Каждый документ коллекции books должен содержать следующую структуру данных:

{
title: "string",
description: "string",
authors: "string"
}


запрос(ы) для вставки данных минимум о двух книгах в коллекцию books

db.books.insertOne({
    title: "book1",
    description: "book first",
    authors: "test1"
});

db.books.insertMany([

{ 
    title: "book2",
    description: "book second",
    authors: "test2" 
},

{ 
    title: "book3",
    description: "book third",
    authors: "test3" 
},
]);


запрос для поиска полей документов коллекции books по полю title

db.books.find(
{title:"book1"}
)


запрос для редактирования полей: description и authors коллекции books по _id записи

db.books.updateOne(
{ _id: 1}
{$set: {description: "book first new", authors:"new authors"}}
)

