export default {
  name: 'location',
  title: 'Location Category',
  type: 'document',
  fields: [
    {
      name: "name",
      type: "string",
      title: "Location name",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "image",
      type: "image",
      title: "Image of Location",
    },
  ],
};
