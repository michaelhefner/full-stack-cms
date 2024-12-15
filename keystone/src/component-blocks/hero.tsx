/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx } from '@keystone-ui/core'
import { component, fields, NotEditable } from '@keystone-6/fields-document/component-blocks'

export const hero = component({
    label: 'Hero',
    schema: {
        heading: fields.text({
            label: 'Heading',
        }),
        subheading: fields.text({
            label: 'Subheading',
        }),
        content: fields.text({
            label: 'Content',
        }),
        heroType: fields.select({
            label: 'Hero Type',
            options: [
                { value: 'primary', label: 'Primary' },
                { value: 'secondary', label: 'Secondary' },
            ] as const,
            defaultValue: 'primary',
        }),
        imageSrc: fields.text({
            label: 'Image URL',
        }),
        imageAlt: fields.text({
            label: 'Alt text',
            defaultValue: 'Image',
        }),
    },
    preview: function Media(props) {
        return (
            <div>

                <NotEditable style={{ 
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                }}>
                    <div style={{
                        padding: '1rem',
                    }}>
                        <h1>{props.fields.heading.value}</h1>
                        <h2>{props.fields.subheading.value}</h2>
                        <p>{props.fields.content.value}</p>
                    </div>
                        <img
                            style={{
                                height: 'auto',
                                borderRadius: '15px',
                                boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                            }}
                            width="100%"
                            height="480"
                            src={props.fields.imageSrc.value}
                            alt={props.fields.imageAlt.value}
                        />
                </NotEditable>
            </div>
        )
    },
})