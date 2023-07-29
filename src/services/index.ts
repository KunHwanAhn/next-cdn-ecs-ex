import baseInstance from '@/utils/apiInterface';
import type { Todo, Album } from '@/@types/index';

export const getTodos = async (): Promise<Todo[] | null> => baseInstance.get('/todos');
export const getAlbums = async (): Promise<Album[] | null> => baseInstance.get('/albums');
