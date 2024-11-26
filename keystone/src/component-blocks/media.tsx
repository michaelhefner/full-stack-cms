/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx } from '@keystone-ui/core'
import { component, fields, NotEditable } from '@keystone-6/fields-document/component-blocks'

export const media = component({
  label: 'Media',
  schema: {
    imageSrc: fields.text({
      label: 'Image URL',
    }),
    caption: fields.conditional(fields.checkbox({ label: 'Has caption' }), {
      false: fields.empty(),
      true: fields.child({
        kind: 'block',
        placeholder: 'Write a caption...',
        formatting: 'inherit',
        links: 'inherit',
      }),
    }),
  },
  preview: function Media (props) {
    return (
      <div>
        <NotEditable>
          <div
            css={{
              backgroundImage: `url(${props.fields.imageSrc.value})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              minHeight: 200,
              width: '100%',
            }}
          />
        </NotEditable>
        {props.fields.caption.discriminant ? (
          <div css={{ textAlign: 'center' }}>{props.fields.caption.value.element}</div>
        ) : null}
      </div>
    )
  },
})