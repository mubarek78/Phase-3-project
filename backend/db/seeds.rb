puts "🌱 Seeding data..."

5.times do
  user = User.create(
    name: Faker::Name.first_name 
  )

# run a loop 5 times
5.times do
  movie = Movie.create(
    title: Faker::Movie.title,
    year: rand(1980..2022),
    directedby: Faker::Name.first_name,
    price: rand(50..600) 
  )

  # create between 1 and 5 reviews for each movie
  rand(1..4).times do
    Review.create(
      score: rand(1..5),
      comment: Faker::Lorem.sentence,
      movie_id: movie.id, # use the ID (primary key) of the movie as the foreign key
      user_id: user.id # use the ID (primary key) of the user as the foreign key
    )
   end
  end
end

puts " 🌱 Done seeding!"