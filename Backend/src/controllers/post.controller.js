import { Post } from "../models/post.model";

//Create a post
const createPost = async (req, res) => {
    try {

        const {description, name, age } = req.body;

        if(!name || !description || !age){
            return res.status(400).json({
                message: "All field required"
            });

            const post = await Post.create({name, description, age});

            res.status(201).json({
                message: "Post created succssesfully", post
            });
        }
        
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error", error
        })
    }
}

export {
    createPost
}; 
