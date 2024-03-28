import path from 'path'

import { payloadCloud } from '@payloadcms/plugin-cloud'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { slateEditor } from '@payloadcms/richtext-slate'
import { buildConfig } from 'payload/config'
import dotenv from 'dotenv'

import Users from './collections/Users'


dotenv.config({
    path: path.resolve(__dirname, '../.env'),
})

export default buildConfig({
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
    collections: [Users],
    routes: {
        admin: '/sell'
    },
    admin: {
        bundler: webpackBundler(),
        user: Users.slug,
        meta: {
            titleSuffix: "- DigiHippo",
            favicon: '/favicon.ico',
            ogImage: '/thumbnail.jpg',
        }
    },
    rateLimit: {
        max: 2000,
    },
    editor: slateEditor({}),
    db: mongooseAdapter({
        url: process.env.DATABASE_URI!,
    }),
    typescript: {
        outputFile: path.resolve(__dirname, 'payload-types.ts'),
    },
    graphQL: {
        schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
    },
    plugins: [payloadCloud()],
})