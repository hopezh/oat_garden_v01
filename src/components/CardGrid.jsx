import PostCard from './PostCard.jsx'

export default function CardGrid({ posts, selectedTags, onTagClick }) {
  return (
    <div className="card-grid">
      {posts.map((post) => (
        <PostCard key={post.file} post={post} selectedTags={selectedTags} onTagClick={onTagClick} />
      ))}
    </div>
  )
}
