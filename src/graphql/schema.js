import { gql } from "apollo-server-lambda";

const typeDefs = gql`
  type Query {
    mangaListBy(param: Option, skip: Int, limit: Int): List!
    manga(mangaId: ID!): Manga!
    chapter(chapterId: ID!): Chapter!
  }

  input Option {
    key: String
    value: String
  }

  type List {
    list: [Manga!]!
    count: Int!
  }

  type Manga {
    mangaId: String
    image: String
    title: String
    alias: String
    description: String
    artist: String
    author: String
    last_chapter_date: Int
    chapters_len: Int
    created: Int
    released: Int
    hits: Int
    aka: [String]
    categories: [String]
    chapters: [Chapter]
    status: Int
    type: Int
  }

  type Chapter {
    chapterId: String
    chapterInt: Int
    chapterDate: Int
    chapterTitle: String
    chapterImages: [ChapterImage]
  }

  type ChapterImage {
    imageInt: Int
    chapterImage: String
  }
`;

export default typeDefs;
