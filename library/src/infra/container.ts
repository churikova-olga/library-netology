import {Container} from "inversify";
import { BooksRepository } from './BooksRepository';
import "reflect-metadata";

const container = new Container();

container.bind(BooksRepository).to(BooksRepository).inSingletonScope();

export {container};