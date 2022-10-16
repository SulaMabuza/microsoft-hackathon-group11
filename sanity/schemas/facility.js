export default {
  name: 'facility',
  title: 'Facility',
  type: 'document',
  fields: [
    {
      name: "name",
      type: "string",
      title: "Facility name",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "short_description",
      type: "string",
      title: "Short description",
      validation: (Rule) => Rule.max(200),
    },


    {
      name: "image",
      type: "image",
      title: "Image of the Facility",
    },
    {
      name: "lat",
      type: "number",
      title: "Latitude of the Facility",
    },
    {
      name: "long",
      type: "number",
      title: "Longitude of the Facility",
    },
    {
      name: "address",
      type: "string",
      title: "Facility address",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "emailaddress",
      type: "string",
      title: "Email address",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "phonenumber",
      type: "number",
      title: "Contact Number",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "city",
      type: "string",
      title: "City",
      validation: (Rule) =>Rule.required(),
    },
    {
      name: "rating",
      type: "number",
      title: "Enter a Rating from (1-5 Stars)",
      validation: (Rule) => 
        Rule.required()
          .min(1)
          .max(5)
          .error("Please enter a Value between 1 and 5"),
    },
    {
      name: "aboutvaccination",
      type: "string",
      title: "Vaccination Procedure at Your Facility"
    },
    {
      name: "vaccinationschedule",
      type: "string",
      title: "Open and Close Time? E.g 8am - 5pm",
    },
    {
      name: "type",
      title: "Category",
      validation: (Rule) => Rule.required(),
      type: "reference",
      to: [{ type: "category" }],
    },
    {
      name: "vaccines",
      type: "array",
      title: "Vaccines",
      of: [{ type: "reference", to: [{ type: "vaccine" }] }],
    },

  ],

}
