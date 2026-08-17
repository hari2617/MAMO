import { useState } from "react";
import axios from "axios"
import { useDispatch } from "react-redux";
import { setListings, setUserListings } from "../app/features/listingSlice";
import { useParams } from "react-router-dom";
import { useEffect } from "react";


const ManageListing = () => {
  const [formData, setFormData] = useState({
    title: "",
    platform: "",
    username: "",
    followersCount: "",
    engagementRate: "",
    monthlyViews: "",
    niche: "",
    price: "",
    description: "",
    country: "",
    ageRange: "",
    monetized: false,
    image:[],
  });

    const {id:paramsId} = useParams()
    console.log(paramsId)
   useEffect(()=>{
    if(!paramsId) return;
            const fetchData = async()=>{
              const res=await axios.get(`http://localhost:7000/api/getListings/${paramsId}`,{withCredentials:true})
              setFormData(res.data)
            }
  
            fetchData()
    },[paramsId])
  

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
  const files = Array.from(e.target.files);

  setFormData({
    ...formData,
    image: files
  });
};

  const handleSubmit = async(e) => {
    e.preventDefault();


    const data = new FormData();

    data.append("title", formData.title);
    data.append("platform", formData.platform);
    data.append("username", formData.username);
    data.append("followersCount", formData.followersCount);
    data.append("engagementRate", formData.engagementRate);
    data.append("monthlyViews", formData.monthlyViews);
    data.append("niche", formData.niche);
    data.append("price", formData.price);
    data.append("description", formData.description);
    data.append("country", formData.country);
    data.append("ageRange", formData.ageRange);
    data.append("monetized", formData.monetized);

    formData.image.forEach((file) => {
      data.append("images", file);
    });

    if(!paramsId){
      try{

      const res = await axios.post("http://localhost:7000/api/postListings",data,{withCredentials: true,})
        setListings(res.data)
        setUserListings(res.data)

        console.log(res)

      }catch(err){
        console.log(err)
      }
    }else{
      try{
        const res = await axios.put("http://localhost:7000/api/postListings",data,{withCredentials: true,})
        setListings(res.data)
        setUserListings(res.data)
        console.log(res)

      }catch(err){
        console.log(err)
      }
    }

    //console.log("Listing sent to server")
    setFormData({
    title: "",
    platform: "",
    username: "",
    followersCount: "",
    engagementRate: "",
    monthlyViews: "",
    niche: "",
    price: "",
    description: "",
    country: "",
    ageRange: "",
    monetized: false,
    image:[],
  })
  };

  return (
    <div className="min-h-screen bg-white py-10 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <button className="text-gray-500 hover:text-blue-600 mb-4">
            ← Back to Marketplace
          </button>

          <h1 className="text-3xl font-semibold text-gray-900">
            Create a Listing
          </h1>

          <p className="text-gray-500 mt-2">
            Provide the details of the social media account you want to sell.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden"
        >

          {/* Gradient Header */}
          <div className="h-2 bg-gradient-to-r from-pink-500 to-purple-500"></div>

          {/* Basic Information */}
          <div className="p-7 border-b border-gray-200">

            <h2 className="text-xl font-semibold text-gray-900 mb-1">
              Basic Information
            </h2>

            <p className="text-sm text-gray-500 mb-6">
              Tell buyers about your social media account.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Title */}
              <div className="md:col-span-2">
                <label className="label">
                  Listing Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Tech YouTube Channel with 120k Subscribers"
                  className="input"
                  required
                />
              </div>

              {/* Platform */}
              <div>
                <label className="label">
                  Platform
                </label>

                <select
                  name="platform"
                  value={formData.platform}
                  onChange={handleChange}
                  className="input"
                  required
                >
                  <option value="">Select platform</option>
                  <option value="youtube">YouTube</option>
                  <option value="instagram">Instagram</option>
                  <option value="tiktok">TikTok</option>
                  <option value="facebook">Facebook</option>
                  <option value="twitter">Twitter / X</option>
                  <option value="pinterest">Pinterest</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="discord">Discord</option>
                </select>
              </div>

              {/* Username */}
              <div>
                <label className="label">
                  Username
                </label>

                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="@TechSavvyAlex"
                  className="input"
                  required
                />
              </div>

            </div>
          </div>

          {/* Audience & Statistics */}
          <div className="p-7 border-b border-gray-200">

            <h2 className="text-xl font-semibold text-gray-900 mb-1">
              Audience & Statistics
            </h2>

            <p className="text-sm text-gray-500 mb-6">
              Provide accurate account statistics.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

              {/* Followers */}
              <div>
                <label className="label">
                  Followers
                </label>

                <input
                  type="number"
                  name="followersCount"
                  value={formData.followersCount}
                  onChange={handleChange}
                  placeholder="120000"
                  className="input"
                  min="0"
                  required
                />
              </div>

              {/* Engagement */}
              <div>
                <label className="label">
                  Engagement Rate (%)
                </label>

                <input
                  type="number"
                  name="engagementRate"
                  value={formData.engagementRate}
                  onChange={handleChange}
                  placeholder="4.5"
                  step="0.1"
                  min="0"
                  className="input"
                />
              </div>

              {/* Monthly Views */}
              <div>
                <label className="label">
                  Monthly Views
                </label>

                <input
                  type="number"
                  name="monthlyViews"
                  value={formData.monthlyViews}
                  onChange={handleChange}
                  placeholder="850000"
                  min="0"
                  className="input"
                />
              </div>

              {/* Niche */}
              <div>
                <label className="label">
                  Niche
                </label>

                <select
                  name="niche"
                  value={formData.niche}
                  onChange={handleChange}
                  className="input"
                  required
                >
                  <option value="">Select niche</option>
                  <option value="tech">Technology</option>
                  <option value="fitness">Fitness</option>
                  <option value="fashion">Fashion</option>
                  <option value="gaming">Gaming</option>
                  <option value="travel">Travel</option>
                  <option value="finance">Finance</option>
                  <option value="education">Education</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="food">Food</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Country */}
              <div>
                <label className="label">
                  Country
                </label>

                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="USA"
                  className="input"
                />
              </div>

              {/* Age Range */}
              <div>
                <label className="label">
                  Audience Age Range
                </label>

                <select
                  name="ageRange"
                  value={formData.ageRange}
                  onChange={handleChange}
                  className="input"
                >
                  <option value="">Select age range</option>
                  <option value="13-17">13-17</option>
                  <option value="18-24">18-24</option>
                  <option value="18-34">18-34</option>
                  <option value="25-34">25-34</option>
                  <option value="35-44">35-44</option>
                  <option value="45+">45+</option>
                </select>
              </div>

            </div>
          </div>

          {/* Pricing */}
          <div className="p-7 border-b border-gray-200">

            <h2 className="text-xl font-semibold text-gray-900 mb-1">
              Pricing & Description
            </h2>

            <p className="text-sm text-gray-500 mb-6">
              Set your asking price and describe the account.
            </p>

            {/* Price */}
            <div className="mb-5 max-w-md">
              <label className="label">
                Asking Price ($)
              </label>

              <div className="relative">
                <span className="absolute left-4 top-3 text-gray-500">
                  $
                </span>

                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="7500"
                  className="input pl-8"
                  min="0"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="label">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                placeholder="Describe your account, audience, revenue, growth, assets included, etc."
                className="input resize-none"
                required
              />
            </div>

          </div>

          {/* Images */}
          <div className="p-7 border-b border-gray-200">

            <h2 className="text-xl font-semibold text-gray-900 mb-1">
              Account Images
            </h2>

            <p className="text-sm text-gray-500 mb-5">
              Upload screenshots showing your account statistics.
            </p>

            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition cursor-pointer">

              <div className="text-4xl mb-3">
                📷
              </div>

              <p className="font-medium text-gray-700">
                Upload screenshots
              </p>

              <p className="text-sm text-gray-400 mt-1">
                PNG, JPG up to 5MB each
              </p>

              <input
              onChange={handleImageChange}
                type="file"
                multiple
                accept="image/png,image/jpeg"
                className="mt-5  cursor-pointer"
              />

            </div>

          </div>

          {/* Monetization */}
          <div className="p-7 border-b border-gray-200">

            <label className="flex items-center gap-3 cursor-pointer">

              <input
                type="checkbox"
                name="monetized"
                checked={formData.monetized}
                onChange={handleChange}
                className="w-5 h-5 accent-blue-600"
              />

              <div>
                <p className="font-medium text-gray-800">
                  This account is monetized
                </p>

                <p className="text-sm text-gray-500">
                  Confirm that the account currently generates revenue.
                </p>
              </div>

            </label>

          </div>

          {/* Buttons */}
          <div className="p-7 flex justify-end gap-4">

            <button
              type="button"
              className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-7 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition shadow-sm"
            >
              Create Listing
            </button>

          </div>

        </form>
      </div>

      {/* Reusable Tailwind classes */}
      <style>{`
        .label {
          display: block;
          font-size: 14px;
          font-weight: 500;
          color: #374151;
          margin-bottom: 8px;
        }

        .input {
          width: 100%;
          padding: 12px 14px;
          border: 1px solid #d1d5db;
          border-radius: 10px;
          outline: none;
          color: #1f2937;
          background: white;
          transition: all 0.2s;
        }

        .input:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }
      `}</style>
    </div>
  );
};

export default ManageListing;