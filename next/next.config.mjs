/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['localhost', 'www.paychex.com'],

        // localPatterns: [
        //     {
        //         pathname: 'localhost:3000/images/**',
        //         search: '',
        //     },
        // ],
    },
};

export default nextConfig;
