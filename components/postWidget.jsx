import { useEffect, useState } from "react"
import { getRecentPosts,getSimilarPosts } from '../services'
import Image from 'next/image'
import moment from 'moment'
import Link from 'next/link'

const PostWidget = ({ categories,slug}) => {
    const [relatedPosts,setRelatedPosts] = useState([])

    useEffect(()=>{
        if (slug) {
            getSimilarPosts(categories,slug)
                .then((result)=> setRelatedPosts(result))
        } else {
            getRecentPosts()
                .then((result)=>setRelatedPosts(result))
        }
    },[slug])
    return (
        <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
            <h3 className="text-xl mb-8 font-semibold border-b pb-4">
                {slug? "Related Posts":"Recent Posts"}
            </h3>
            {relatedPosts.map((post,index)=> (
                <div key={index} className="flex items-center w-full mb-4">
                    <div className="flex-none w-16">
                        <Image
                            unoptimized
                            loader
                            alt={post.title}
                            height="60px"
                            width="60px"
                            src={post.featuredImage.url}
                        />
                    </div>
                    <div className="flex-grow ml-4">
                        <p className="text-gray-500 font-xs">{moment(post.createdAt).format('MMM DD,YYYY')}</p>
                        <Link href={`/post/${post.slug}`} className="text-md">{post.title}</Link>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default PostWidget