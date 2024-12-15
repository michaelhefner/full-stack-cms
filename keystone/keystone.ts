import { config, group, list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { checkbox, image, password, relationship, select, text, timestamp } from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';
import { isAdmin } from './src/isAdmin';
import { session, withAuth } from './auth';
import { componentBlocks } from './src/component-blocks';
import dotenv from 'dotenv';

dotenv.config();

const {
    // The S3 Bucket Name used to store assets
    S3_BUCKET_NAME: bucketName = 'keystone-test',
    // The region of the S3 bucket
    S3_REGION: region = 'ap-southeast-2',
    // The Access Key ID and Secret that has read/write access to the S3 bucket
    S3_ACCESS_KEY_ID: accessKeyId = 'keystone',
    S3_SECRET_ACCESS_KEY: secretAccessKey = 'keystone',
    // The base URL to serve assets from
    ASSET_BASE_URL: baseUrl = 'http://localhost:3000',
} = process.env;
const dbURL = process.env.DATABASE_URL || 'file:../keystone.db';

export default withAuth(config({
    db: {
        provider: 'sqlite',
        url: dbURL,
    },
    lists: {
        Navigation: list({
            access: {
                operation: {
                    query: allowAll,
                    create: isAdmin,
                    update: isAdmin,
                    delete: isAdmin,
                }
            },
            ui: {
                isHidden: false,
            },
            fields: {
                title: text({ validation: { isRequired: true } }),
                url: text({ validation: { isRequired: true }, isIndexed: 'unique' }),
                basicpages: relationship({
                    ref: 'BasicPage.navigation',
                    many: false,
                    ui: {
                        displayMode: 'cards',
                        cardFields: ['title'],
                        inlineEdit: { fields: ['title'] },
                        linkToItem: true,
                        inlineConnect: true,
                    },
                }),
                parent: relationship({
                    ref: 'Navigation',
                    many: false,
                    ui: {
                        displayMode: 'cards',
                        cardFields: ['title'],
                        inlineEdit: { fields: ['title'] },
                        linkToItem: true,
                        inlineConnect: true,
                    },
                }),
                // status: relationship({
                //     ref: 'Basicpage.status',
                //     many: true,
                //     ui: {
                //         displayMode: 'cards',
                //         cardFields: ['status'],
                //         linkToItem: true,
                //     },
                // }),
            },
        }),
        BasicPage: list({
            access: {
                operation: {
                    query: allowAll,
                    create: allowAll,
                    update: allowAll,
                    delete: isAdmin,
                }
            },
            ui: {
                listView: {
                    initialColumns: ['title', 'navigation', 'content', 'author', 'status', 'tags'],
                },
            },
            description: 'A Page is a single page on the website',
            fields: {
                title: text({ validation: { isRequired: true } }),
                // ...group({
                //     label: 'Group label',
                //     description: 'Group description',
                //     fields: {
                //     },
                // }),
                navigation: relationship({
                    ref: 'Navigation.basicpages',
                    many: false,
                    ui: {
                        displayMode: 'cards',
                        cardFields: ['title'],
                        inlineEdit: { fields: ['title', 'url'] },
                        linkToItem: true,
                        inlineConnect: true,
                        inlineCreate: { fields: ['title', 'url'] },
                    },
                }),
                content: relationship({
                    ref: 'Content.basicpages',
                    many: true,
                    ui: {
                        displayMode: 'cards',
                        cardFields: ['title'],
                        linkToItem: true,
                        inlineConnect: true,
                        inlineCreate: { fields: ['title', 'content', 'tags', 'author', 'status'] },
                    },
                }),
                author: relationship({
                    ref: 'User.basicpages',
                    ui: {
                        displayMode: 'cards',
                        cardFields: ['name'],
                        inlineEdit: { fields: ['name'] },
                        linkToItem: true,
                        inlineConnect: true,
                    },
                    many: false,
                }),
                tags: relationship({
                    ref: 'Tag.basicpages',
                    many: true,
                    ui: {
                        displayMode: 'cards',
                        cardFields: ['name'],
                        inlineEdit: { fields: ['name'] },
                        linkToItem: true,
                        inlineConnect: true,
                        inlineCreate: { fields: ['name'] },
                    },
                }),
                status: select({
                    defaultValue: 'draft',
                    ui: { displayMode: 'segmented-control' },
                    options: [
                        { label: 'Published', value: 'published' },
                        { label: 'Draft', value: 'draft' },
                        { label: 'Archived', value: 'archived' },
                    ],
                }),
                publishedAt: timestamp(
                    {defaultValue: { kind: 'now' },}
                ),
            },
        }),
        Content: list({
            access: {
                operation: {
                    query: allowAll,
                    create: isAdmin,
                    update: isAdmin,
                    delete: isAdmin,
                }
            },

            fields: {
                ...group({
                    label: 'Settings',
                    description: 'Content settings',
                    fields: {
                        title: text({ validation: { isRequired: true } }),
                        author: relationship({
                            ref: 'User.content',
                            ui: {
                                displayMode: 'cards',
                                cardFields: ['name', 'email'],
                                inlineEdit: { fields: ['name', 'email'] },
                                linkToItem: true,
                                inlineConnect: true,
                            },
                            many: false,
                        }),
                        classes: text({ defaultValue: 'section-content' }),
                        tags: relationship({
                            ref: 'Tag.content',
                            many: true,
                            ui: {
                                displayMode: 'cards',
                                cardFields: ['name'],
                                inlineEdit: { fields: ['name'] },
                                linkToItem: true,
                                inlineConnect: true,
                                inlineCreate: { fields: ['name'] },
                            },
                        }),
                        basicpages: relationship({ ref: 'BasicPage.content', many: true }),
                    },
                }),
                
                content: document({
                    formatting: true,
                    layouts: [
                        [1],
                    ],
                    links: true,
                    dividers: true,
                    ui: {
                      views: './src/component-blocks',
                    },
                    componentBlocks,
                }),
                status: select({
                    defaultValue: 'draft',
                    ui: { displayMode: 'segmented-control' },
                    options: [
                        { label: 'Published', value: 'published' },
                        { label: 'Draft', value: 'draft' },
                        { label: 'Archived', value: 'archived' },
                    ],
                }),
                publishedAt: timestamp(
                    {defaultValue: { kind: 'now' },}
                ),
            },
        }),
        User: list({
            access: {
                operation: {
                    create: isAdmin,
                    update: isAdmin,
                    delete: isAdmin,
                    query: ({ session, context, listKey, operation }) => true,
                }
            },
            fields: {
                name: text({ validation: { isRequired: true } }),
                email: text({
                    isIndexed: 'unique',
                }),
                password: password({ validation: { isRequired: true } }),
                isAdmin: checkbox({ defaultValue: false }),
                content: relationship({ ref: 'Content.author', many: true }),
                basicpages: relationship({ ref: 'BasicPage.author', many: true }),
                createdAt: timestamp({
                    defaultValue: { kind: 'now' },
                }),
            },
        }),
        Tag: list({
            access: allowAll,
            ui: {
                isHidden: false,
            },
            fields: {
                name: text(),
                tags: relationship({
                    ref: 'Tag',
                    many: true,
                    ui: {
                        displayMode: 'cards',
                        cardFields: ['name'],
                        inlineEdit: { fields: ['name'] },
                        linkToItem: true,
                        inlineConnect: true,
                        inlineCreate: { fields: ['name'] },
                    },
                }),
                content: relationship({ ref: 'Content.tags', many: true }),
                basicpages: relationship({ ref: 'BasicPage.tags', many: true }),
            },
        }),
        Image: list({
            fields: {
                name: text({
                    validation: {
                        isRequired: true,
                    },
                }),
                altText: text(),
                image: image({ storage: 'my_local_images' }),
            },
            access: allowAll,
        }),
        SiteSetting: list({
            access: {
                operation: {
                    query: allowAll,
                    create: isAdmin,
                    update: isAdmin,
                    delete: isAdmin,
                }
            },
            ui: {
                isHidden: false,
            },
            fields: {
                title: text({ validation: { isRequired: true } }),
                url: text({ validation: { isRequired: true }, isIndexed: 'unique' }),
                metaDescription: text(),
                logo: image({ storage: 'my_local_images' }),
                favicon: image({ storage: 'my_local_images' }),
            },
        }),
    },
    storage: {
        my_local_images: {
            // Images that use this store will be stored on the local machine
            kind: 'local',
            // This store is used for the image field type
            type: 'image',
            // The URL that is returned in the Keystone GraphQL API
            generateUrl: path => `${baseUrl}/images${path}`,
            // The route that will be created in Keystone's backend to serve the images
            serverRoute: {
                path: '/images',
            },
            // Set serverRoute to null if you don't want a route to be created in Keystone
            // serverRoute: null
            storagePath: 'public/images',
        },
        /** more storage */

        // The key here will be what is referenced in the file field
        my_s3_files: {
            // Files that use this store will be stored in an s3 bucket
            kind: 's3',
            // This store is used for the file field type
            type: 'file',
            // The S3 bucket name pulled from the S3_BUCKET_NAME environment variable above
            bucketName,
            // The S3 bucket region pulled from the S3_REGION environment variable above
            region,
            // The S3 Access Key ID pulled from the S3_ACCESS_KEY_ID environment variable above
            accessKeyId,
            // The S3 Secret pulled from the S3_SECRET_ACCESS_KEY environment variable above
            secretAccessKey,
            // The S3 links will be signed so they remain private
            signed: { expiry: 5000 },
        },
    },

    session,
})
);