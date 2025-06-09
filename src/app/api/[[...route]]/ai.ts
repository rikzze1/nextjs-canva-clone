import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { replicate } from '@/lib/replicate';

const app = new Hono().post(
  '/generate-image',
  zValidator(
    'json',
    z.object({
      prompt: z.string(),
    })
  ),
  async c => {
    const { prompt } = c.req.valid('json');
    const output: unknown = await replicate.run(
      'stability-ai/stable-diffusion:ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4',
      {
        input: {
          width: 768,
          height: 768,
          prompt: prompt,
          scheduler: 'K_EULER',
          num_outputs: 1,
          guidance_scale: 7.5,
          num_inference_steps: 50,
        },
      }
    );
    const res = output as Array<string>;
    return c.json({ data: res[0] });
  }
);

export default app;
