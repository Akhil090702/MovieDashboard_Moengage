// GET /api/movies/stats/genre-distribution
export const genreDistribution = async (req, res) => {
  try {
    const result = await Movie.aggregate([
      { $unwind: "$genre" },
      { $group: { _id: "$genre", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to calculate genre distribution' });
  }
};

// GET /api/movies/stats/average-rating
export const averageRating = async (req, res) => {
  try {
    const result = await Movie.aggregate([
      { $match: { rating: { $ne: null } } },
      { $group: { _id: null, avgRating: { $avg: "$rating" } } }
    ]);
    res.json({ avgRating: result[0]?.avgRating || 0 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to calculate average rating' });
  }
};

// GET /api/movies/stats/runtime-by-year
export const runtimeByYear = async (req, res) => {
  try {
    const result = await Movie.aggregate([
      { $match: { runtime: { $ne: null } } },
      { $group: {
        _id: "$year",
        avgRuntime: { $avg: "$runtime" },
        count: { $sum: 1 }
      }},
      { $sort: { _id: 1 } }
    ]);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to calculate runtime by year' });
  }
};
