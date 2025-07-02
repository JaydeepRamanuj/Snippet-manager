### Database design choice

In this project the main data I want to store is snippet. But to categorize them I want to have folders and to distinguish the author I need to check for user.

So I decided to store data in this way

```cmd
users
|-snippets
|-folders

```

Here for every user we store snippets and folders separately.

But there is a problem. We can't have sub-collections in mongoDB.

I was mostly using firebase for my Database need in all most my previous projects, in firebase we can have sub-collection inside a collection but in mongoDB we can't.

On further inspection, I got to know even firebase isn't directly allowing sub-collections but it links them behind the scene but shows us in sub-collection like format to visualize properly.

So now I have to find a way to store all users data in 3 different collections and still provide data to authorized and intended user only.

To do so, I have added `userId` in each document and will check for userId before providing that data. This is very crucial step unless data way get served ro wrong user

so now my collections are

```cmd
- users
- snippets
- folders

```

This led to one big question, is it good to keep documents of all users in single collection and is it scalable ?

The answer is yes. Most Saas companies follows this approach as this help them manage collections easily.

For security, they check userId before allowing access like I do.
For performance, they utilize indexes, MongoDB is designed to manage thousands or even millions of document in single collection and querying on them efficiently.
