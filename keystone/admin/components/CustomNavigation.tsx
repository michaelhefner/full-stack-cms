import React from 'react'

import { ListNavItems, NavigationContainer, NavItem } from '@keystone-6/core/admin-ui/components'
import type { NavigationProps } from '@keystone-6/core/admin-ui/components'
import './styles.css'

const localStyle = {
    placeholder: {
        background: 'transparent',
        borderBottomRightRadius: '4px',
        borderTopRightRadius: '4px',
        color: '#6b7280',
        display: 'block',
        fontWeight: '500',
        marginBottom: '4px',
        marginRight: '24px',
        padding: '8px 24px',

    }
}
export function CustomNavigation ({ lists, authenticatedItem }: NavigationProps) {
  return (
    <NavigationContainer authenticatedItem={authenticatedItem}>
      <NavItem href="/">Dashboard</NavItem>
      
      <div className='collapsed'>
        <p className='li-placeholder' onClick={(e) => ((e.target as HTMLElement).parentElement as HTMLElement).classList.toggle('collapsed')}>Admin Menu</p>
        <div className='collapsable'>
            <ListNavItems lists={lists} />
            <NavItem href="https://keystonejs.com">Keystone Docs</NavItem>
            <NavItem href="/custom-page">Custom Page</NavItem>
        </div>
      </div>
    </NavigationContainer>
  )
}