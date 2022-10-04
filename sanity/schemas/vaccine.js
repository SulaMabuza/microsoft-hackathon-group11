export default {
  name: 'vaccine',
  title: 'Vaccine',
  type: 'document',
  fields: [
    {
      name: "name",
      type: "string",
      title: "Name of vaccine",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "short_description",
      type: "string",
      title: "Short description",
      validation: (Rule) => Rule.max(200),

    },
    {
      name: "price",
      type: "number",
      title: "Price of the vaccine in GBP",
    },
    {
      name: "image",
      type: "image",
      title: "Image of the Vaccine",
    },

  ],
}
