class ApplicationController < Sinatra::Base
  set :default_content_type, 'application/json'
  
  # Add routes
  get '/movies' do
    Movie.all.to_json(include: [:reviews, :users])
  end

  get '/movies/:id' do
    mv = Movie.find params[:id]
    mv.to_json(include: :reviews)
  end

  post '/movies' do
    movie = Movie.create(
      title: params[:title],
      year: params[:year],
      directedby: params[:directedby],
      price: params[:price]
     
    )
    movie.to_json
  
  end

  patch '/movies/:id' do
    mv = Movie.find params[:id]
    mv.price = params[:price],
    mv.title = params[:title]
    mv.save
    mv.to_json
  end

  delete '/movies/:id' do
    Movie.destroy params[:id]
  end
  

  get '/reviews' do
    Review.all.to_json
  end

  post '/reviews' do
    review = Review.create(
      score: params[:score],
      comment: params[:comment],
      movie_id: params[:movie_id],
      user_id: params[:user_id]
    )
    review.to_json
  end
end



