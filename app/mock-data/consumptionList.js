export const consumptionList = [
    {
    chistoryID: 1,
    userID : 2, //조회 유저의 친구 관계여야함
    amount : 15000,
    content : "카페(내가쏨)",
    category : [ "카페", ],
    comment: [
    ],
    emoticon: [
    {
            emoticonID:2,
            userID: 4,
            category:"good",
    }],
    commentCount:2,
    positiveEmoticonCount:3,
    negativeEmoticonCount:2,
    },
{
    chistoryID: 2,
    userID : 2,
    amount : 15000,
    content : "다른 내용",
    category : [ "카페", ],
    comment: [
        {
                commentID: 1,
                userID: 3,
                content: "나도사줘",
                date:"2023-05-11",
        }
    ],
    emoticon: [
        {
                emoticonID:2,
                userID: 4,
                category:"good",
        }
    ],
    commentCount:2,
    positiveEmoticonCount:3,
    negativeEmoticonCount:2,
    },
    {
        chistoryID: 3,
        userID : 2,
        amount : 15000,
        content : "다른 내용",
        category : [ "카페", ],
        comment: [
            {
                    commentID: 1,
                    userID: 3,
                    content: "나도사줘",
                    date:"2023-05-11",
            }
        ],
        emoticon: [
            {
                    emoticonID:2,
                    userID: 4,
                    category:"good",
            }
        ],
        commentCount:2,
        positiveEmoticonCount:3,
        negativeEmoticonCount:2,
        }
]
