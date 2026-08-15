/** @type {import('next').NextConfig} */

const nextConfig = {

  experimental: {

    outputFileTracingIncludes: {

      "/course/[id]": [

        "./data/courses/**/*"

      ],

      "/course/[id]/lesson/[lessonId]": [

        "./data/courses/**/*"

      ]

    }

  }

};


export default nextConfig;
