export default {
  name: 'city',
  title: 'City Category',
  type: 'document',
  fields: [
    {
      name: "name",
      type: "string",
      title: "City name",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "image",
      type: "image",
      title: "Image of City",
    },
  ],
};
