const z = require('zod')

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'El titulo debe ser un string',
    required_error: 'El titulo es requerido'
  }),
  year: z.number().int().positive().min(1900).max(2024),
  director: z.string(),
  duration: z.number().int().positive(),
  poster: z.string().url({
    message: 'El poster debe ser una URL valida'
  }),
  genre: z.array(
    z.enum(['Action', 'Adventure', 'Romance', 'Animation', 'Biography', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy'],
      {
        required_error: 'El genero es requerido',
        invalid_type_error: 'El genero debe ser un string'
      }
    )
  ),
  rate: z.number().min(0).max(10)
})

function validateMovie (object) {
  return movieSchema.safeParse(object)
}

function validatePartialMovie (object) {
  return movieSchema.partial().safeParse(object)
}

module.exports = {
  validateMovie,
  validatePartialMovie
}
