import { pipeline } from '@huggingface/transformers';

export async function getEmbeddings(data: string): Promise<number[]> {
  try {
    const extractor = await pipeline(
      'feature-extraction',
      'Xenova/all-MiniLM-L6-v2'
    );
    const output = await extractor(data, { pooling: 'mean', normalize: true });
    const getArray: number[] = Array.from(output.data);
    return getArray;
  } catch (error) {
    throw new Error('Something went wrong');
  }
}
