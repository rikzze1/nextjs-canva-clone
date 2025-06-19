import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { replicate } from '@/lib/replicate';
import { verifyAuth } from '@hono/auth-js';

const app = new Hono()
  .post(
    '/remove-bg',
    verifyAuth(),
    zValidator(
      'json',
      z.object({
        image: z.string(),
      })
    ),
    async c => {
      const { image } = c.req.valid('json');

      const output: unknown = await replicate.run(
        'lucataco/remove-bg:95fcc2a26d3899cd6c2691c900465aaeff466285a65c14638cc5f36f34befaf1',
        {
          input: {
            image: image,
          },
        }
      );

      const res = output as string;
      return c.json({ data: res });
    }
  )
  .post(
    '/generate-image',
    verifyAuth(),
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
