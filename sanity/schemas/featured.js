export default {
	name: "featured",
	type: "document", 
	title: "Featured Facilities categories",
	fields: [
		{
			name: "name",
			type: "string",
			title: "Featured Category name",
			validation: (Rule) => Rule.required(),
		},
		{
			name: "short_description",
			type: "string",
			title: "Short description",
			validation: (Rule) => Rule.max(200),
		},
		{
			name: "facilities",
			type: "array",
			title: "facilities",
			of: [{ type: "reference", to: [{ type: "facility" }] }],
		},
	],
};