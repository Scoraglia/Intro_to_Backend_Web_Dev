import { Post } from "../models/post.model.js";

//Create a post
const createPost = async (req, res) => {
    try {

        const {description, name, age } = req.body;

        if(!name || !description || !age){
            return res.status(400).json({
                message: "All field required"
            });
        }

        const post = await Post.create({name, description, age});

        res.status(201).json({
            message: "Post created succssesfully", post
        });
        
        
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error", error
        })
    }
}

//Read all posts
const getPosts = async (req, res) => {
    try {

        const post = await Post.find();
        res.status(200).json(post);
        
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error", error
        })
    }
}

//Update a post

const updatePost = async (req, res) => {
    try {

        //Validate if the post is empty
        if(Object.keys(req.body).length === 0) {
           return res.status(400).json({
                message: "No data provided for update"
           });
        }
        
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, {new:true});

        if(!post) return res.status(404).json({
            message: "Post not found!"
        });

        res.status(200).json({
            message: "Post updated succesfully", post
        });
        
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error", error
        })
    }
}

//Delete Post

const deletePost = async (req, res) => {
    try {
        const deleted = await Post.findByIdAndDelete(req.params.id);

        if(!deleted) return res.status(404).json({
            message: "Post not found!"
        });

        res.status(200).json({
            message: "Post successfully deleted!"
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error", error
        })
    }
}

export {
    createPost,
    getPosts,
    updatePost,
    deletePost
}; 
