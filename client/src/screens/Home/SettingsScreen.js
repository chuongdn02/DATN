import React, { useState } from 'react';
import { View, Text, TextInput, Image, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function App() {
  const [postContent, setPostContent] = useState('');
  const [comment, setComment] = useState('');
  const [reply, setReply] = useState('');
  const [posts, setPosts] = useState([]);

  // Hàm đăng bài
  const handlePostSubmit = () => {
    if (postContent.trim()) {
      setPosts([
        ...posts,
        { id: posts.length, content: postContent, comments: [] },
      ]);
      setPostContent('');
    }
  };

  const handleCommentSubmit = (postId) => {
    if (comment.trim()) {
      const updatedPosts = posts.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, { id: post.comments.length, content: comment, replies: [] }] }
          : post
      );
      setPosts(updatedPosts);
      setComment('');
    }
  };

  // Hàm trả lời bình luận
  const handleReplySubmit = (postId, commentId) => {
    if (reply.trim()) {
      const updatedPosts = posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: post.comments.map((comment) =>
                comment.id === commentId
                  ? { ...comment, replies: [...comment.replies, reply] }
                  : comment
              ),
            }
          : post
      );
      setPosts(updatedPosts);
      setReply('');
    }
  };

  return (
    <SafeAreaView className="flex-1">
    <ScrollView style={{ flex: 1, backgroundColor: '#fff', padding: 16 }}>
      {/* Đăng bài */}
      <View style={{ marginBottom: 24 }}>
        <TextInput
          value={postContent}
          onChangeText={setPostContent}
          placeholder="What's on your mind?"
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 12,
            borderRadius: 8,
            marginBottom: 12,
            backgroundColor: '#f9f9f9',
          }}
          multiline
        />
        <TouchableOpacity
          onPress={handlePostSubmit}
          style={{
            backgroundColor: '#0095f6',
            padding: 10,
            borderRadius: 5,
            alignItems: 'center',
          }}>
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Post</Text>
        </TouchableOpacity>
      </View>

      {/* Bảng tin */}
      {posts.map((post) => (
        <View
          key={post.id}
          style={{
            backgroundColor: '#fff',
            borderRadius: 12,
            padding: 16,
            marginBottom: 16,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            elevation: 3,
          }}>
          {/* Header Post */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <Image
              source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
              style={{ width: 40, height: 40, borderRadius: 20, marginRight: 8 }}
            />
            <Text style={{ fontWeight: 'bold' }}>User Name</Text>
          </View>

          {/* Nội dung bài đăng */}
          <Text style={{ marginBottom: 8 }}>{post.content}</Text>

          {/* Hình ảnh bài đăng */}
          <Image
            source={{ uri: 'https://via.placeholder.com/400x300' }}
            style={{ width: '100%', height: 200, borderRadius: 8 }}
          />

          {/* Biểu tượng tương tác */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
            <View style={{ flexDirection: 'row' }}>
              <Icon name="heart" size={20} color="red" style={{ marginRight: 16 }} />
              <Icon name="comment" size={20} color="#000" style={{ marginRight: 16 }} />
              <Icon name="share" size={20} color="#000" />
            </View>
            <Text style={{ color: '#8e8e8e' }}>1 min ago</Text>
          </View>

          {/* Bình luận */}
          <View style={{ marginTop: 16 }}>
            {post.comments.map((comment) => (
              <View key={comment.id} style={{ marginBottom: 12 }}>
                <Text style={{ fontWeight: 'bold' }}>User Name: </Text>
                <Text>{comment.content}</Text>

                {/* Phản hồi bình luận */}
                {comment.replies.map((reply, index) => (
                  <View key={index} style={{ marginLeft: 20 }}>
                    <Text style={{ color: '#555' }}>Reply: {reply}</Text>
                  </View>
                ))}

                {/* Nhập phản hồi bình luận */}
                <TextInput
                  value={reply}
                  onChangeText={setReply}
                  placeholder="Reply..."
                  style={{
                    borderWidth: 1,
                    borderColor: '#ccc',
                    padding: 8,
                    borderRadius: 8,
                    marginTop: 8,
                    backgroundColor: '#f9f9f9',
                  }}
                />
                <TouchableOpacity
                  onPress={() => handleReplySubmit(post.id, comment.id)}
                  style={{
                    backgroundColor: '#0095f6',
                    padding: 8,
                    borderRadius: 5,
                    alignItems: 'center',
                    marginTop: 8,
                  }}>
                  <Text style={{ color: '#fff' }}>Post Reply</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>

          {/* Nhập bình luận */}
          <TextInput
            value={comment}
            onChangeText={setComment}
            placeholder="Add a comment..."
            style={{
              borderWidth: 1,
              borderColor: '#ccc',
              padding: 8,
              borderRadius: 8,
              marginTop: 8,
              backgroundColor: '#f9f9f9',
            }}
          />
          <TouchableOpacity
            onPress={() => handleCommentSubmit(post.id)}
            style={{
              backgroundColor: '#0095f6',
              padding: 8,
              borderRadius: 5,
              alignItems: 'center',
              marginTop: 8,
            }}>
            <Text style={{ color: '#fff' }}>Post Comment</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
    </SafeAreaView>
  );
}
