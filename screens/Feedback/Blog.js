// Blog.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // You might need to install this package
import Footer from '../Footer/Footer'; // Import the Footer component

const Blog = ({ navigation }) => {
  // Dummy data for blog comments
  const blogComments = [
    { id: '1', parentName: 'Parent 1', comment: 'Great blog post! Thanks for sharing.', date: '2 days ago', profileImage: require('../../assets/Profile.jpg') },
    { id: '2', parentName: 'Parent 2', comment: 'Interesting information. Looking forward to more.', date: '1 week ago', profileImage: require('../../assets/Profile.jpg') },
    // Add more comments as needed
  ];

  const renderComments = () => {
    return blogComments.map((comment) => (
      <View key={comment.id} style={styles.commentContainer}>
        <View style={styles.commentHeader}>
          <Image source={comment.profileImage} style={styles.profileImage} />
          <Text style={styles.parentName}>{comment.parentName}</Text>
        </View>
        <Text style={styles.commentText}>{comment.comment}</Text>
        <Text style={styles.commentDate}>{comment.date}</Text>
        <TouchableOpacity style={styles.viewButton} onPress={() => handleViewProfile(comment.parentName)}>
          <Text style={styles.viewButtonText}>View</Text>
        </TouchableOpacity>
      </View>
    ));
  };

  const handleViewProfile = (parentName) => {
    // Handle navigation to the parent's profile page
    // You can customize this based on your navigation structure
    console.log(`View profile of ${parentName}`);
  };

  return (
    <View style={styles.container}>
      {/* Header image and sentence */}
      <Image
        source={require('../../assets/blog.jpg')} // Replace with your blog header image
        style={styles.headerImage}
        resizeMode="cover"
      />
      <Text style={styles.headerText}>Welcome to Our Blog</Text>

      {/* Create a comment box */}
      <View style={styles.createCommentBox}>
        <FontAwesome name="comment" size={24} color="#c2274b" />
        <Text style={styles.createCommentText}>Create a comment</Text>
      </View>

      {/* Blog comments */}
      <ScrollView style={styles.commentsContainer}>
        {renderComments()}
      </ScrollView>

      {/* Footer */}
      <Footer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerImage: {
    height: 200,
    width: '100%',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  createCommentBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#c2274b',
    borderRadius: 8,
    margin: 10,
  },
  createCommentText: {
    marginLeft: 10,
    color: '#c2274b',
    fontWeight: 'bold',
  },
  commentsContainer: {
    flex: 1,
    padding: 10,
  },
  commentContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  parentName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  commentText: {
    color: '#556b8d',
    marginBottom: 5,
  },
  commentDate: {
    color: 'gray',
    marginBottom: 5,
  },
  viewButton: {
    backgroundColor: '#c2274b',
    padding: 8,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  viewButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Blog;
