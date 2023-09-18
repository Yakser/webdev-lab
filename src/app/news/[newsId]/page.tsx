import React from "react";
import {NewsDetail as NewsDetailType} from "@/utils/types";
import NewsDetail from "./NewsDetail";

type PageProps = {
    params: { newsId: number };
}

const getNewsDetail = async (newsId: number): Promise<Response> => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/news/${newsId}/`,
        {cache: 'no-store'});
}
const Page: React.FC<PageProps> = async ({params}: { params: { newsId: number } }) => {
    try {
        const response = await getNewsDetail(params.newsId);
        if (response.ok) {
            const post = await response.json() as NewsDetailType;
            return (
                <NewsDetail newsDetailPost={post}/>
            )
        }
        return (
            <h2 className={'title'}>Новость с таким айди не найдена!</h2>
        )
    } catch (error) {
        console.log(error);
        return (
            <h2 className={'title'}>Произошла ошибка сервера!</h2>
        )
    }
};

export default Page;