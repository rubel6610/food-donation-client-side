import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import UseAuth from "../../hooks/UseAuth";
import useAxiosSecure from "../../hooks/UseAxiosSecure";

const AddReviewModal = ({ openReviewModal, onClose, donation }) => {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure()
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const reviewData = {
      donationTitle:donation.title,
      donationId:donation._id,
      reviewerName: user?.displayName,
      reviewerEmail: user?.email,
      description: data.description,
      rating: parseInt(data.rating),
      reviewedAt: new Date(),
      restaurantName:donation.restaurantName,
      restaurantEmail:donation.restaurantEmail,
    };

    try {
      const res = await axiosSecure.post("/reviews", reviewData)

      if (res.data.insertedId) {
        Swal.fire("Success!", "Review added successfully", "success");
        reset();
        onClose();
      } else {
        Swal.fire("Error!", "Failed to add review", "error");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error!", "Something went wrong", "error");
    }
  };

  if (!openReviewModal) return null;

  return (
    <div className="fixed inset-0 bg-base-100 bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-base-300 w-[90%] max-w-md p-6 rounded-lg shadow-lg space-y-4">
        <h2 className="text-xl font-semibold text-center">Add Review</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-semibold">Your Name</label>
            <input
              type="text"
              readOnly
              defaultValue={user?.displayName}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block font-semibold">Review</label>
            <textarea
              {...register("description", { required: true })}
              className="textarea textarea-bordered w-full"
              placeholder="Write your review here"
            ></textarea>
          </div>

          <div>
            <label className="block font-semibold">Rating (1-5)</label>
            <input
              type="number"
              {...register("rating", { required: true, min: 1, max: 5 })}
              className="input input-bordered w-full"
              min={1}
              max={5}
              placeholder="Enter rating out of 5"
            />
          </div>

          <div className="flex justify-between gap-4">
            <button type="submit" className="btn btn-primary">
              Submit Review
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReviewModal;
