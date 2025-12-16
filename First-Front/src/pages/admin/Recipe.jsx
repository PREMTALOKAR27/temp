import React, { useEffect, useState } from 'react';
import api from '../../config/AxiosInterceptor';
import { toast } from 'react-toastify';

const PropertySubmissions = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(null); // property being edited

  const [form, setForm] = useState({
    name: '',
    location: '',
    price: '',
    builder: '',
    contact: '',
    discount: '',
    description: '',
    features: '',
    images: null,
  });

  const openEdit = (p) => {
    setEditing(p);
    setForm({
      name: p?.name || p?.propertyName || '',
      location: p?.location || '',
      price: p?.price || '',
      builder: p?.builder || '',
      contact: p?.contact || '',
      discount: p?.discount || '',
      description: p?.description || '',
      features: p?.features || '',
      images: null,
    });
  };

  const closeEdit = () => {
    setEditing(null);
    setForm((f) => ({ ...f, images: null }));
  };

  const fetchAll = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get('/api/v1/properties');
      setProperties(Array.isArray(res?.data) ? res.data : []);
    } catch (e) {
      setError('Failed to load properties');
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id) => {
    try {
      await api.delete(`/api/v1/properties/${id}`);
      setProperties((prev) => prev.filter((p) => (p.id || p._id) !== id));
      toast.success('Property deleted');
    } catch (e) {
      toast.error('Failed to delete');
      fetchAll();
    }
  };

  const saveEdit = async (e) => {
    e.preventDefault();
    if (!editing) return;
    try {
      const fd = new FormData();
      fd.append('name', form.name);
      fd.append('location', form.location);
      fd.append('price', form.price);
      fd.append('builder', form.builder);
      fd.append('contact', form.contact);
      fd.append('discount', form.discount);
      fd.append('description', form.description);
      fd.append('features', form.features);
      if (form.images && form.images.length) {
        for (let i = 0; i < form.images.length; i++) fd.append('images', form.images[i]);
      }
      await api.put(`/api/v1/properties/${editing.id || editing._id}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      toast.success('Property updated');
      closeEdit();
      fetchAll();
    } catch (e) {
      toast.error('Failed to update');
      // keep dialog open; optionally show toast
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F6F2] p-4 sm:p-8 font-sans">
      <h2 className="text-4xl font-extrabold text-[#0B1F3A] mb-8">Property Submissions</h2>

      <div className="bg-white rounded-2xl shadow-lg border border-[#EEECE7] overflow-x-auto">
        {loading && (
          <div className="p-4 text-[#5E6C84]">Loading properties…</div>
        )}
        {error && <div className="p-4 text-red-600">{error}</div>}
        <table className="min-w-full table-fixed border-collapse text-sm sm:text-base">
          <thead className="bg-[#3B4C68] text-white text-left">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Location</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Builder</th>
              <th className="py-3 px-4">Contact</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties?.map((property) => (
              <tr
                key={property.id || property._id}
                className="border-b border-[#EEECE7] hover:bg-[#EEECE7] transition-colors"
              >
                <td className="py-3 px-4 font-semibold text-[#1C2C46]">{property.name}</td>
                <td className="py-3 px-4 text-[#5E6C84]">{property.location}</td>
                <td className="py-3 px-4 font-semibold text-[#702FB1]">{property.price}</td>
                <td className="py-3 px-4 text-[#5E6C84]">{property.builder}</td>
                <td className="py-3 px-4 text-[#5E6C84]">{property.contact}</td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <div className="inline-flex items-center gap-2">
                    <button
                      onClick={() => remove(property.id || property._id)}
                      className="px-3.5 py-1.5 rounded-full text-sm font-medium text-white bg-red-600 hover:bg-red-700 shadow-sm transition"
                    aria-label={`Delete property ${property.name}`}
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => openEdit(property)}
                      className="px-3.5 py-1.5 rounded-full text-sm font-semibold text-white bg-[#702FB1] hover:bg-[#5e2993] shadow-sm border border-white/20 transition"
                    aria-label={`Edit property ${property.name}`}
                    >
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {properties?.length === 0 && !loading && (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500 italic">
                  No properties found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Dialog */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <form onSubmit={saveEdit} className="w-full max-w-lg bg-white rounded-xl p-5 space-y-3">
            <div className="text-lg font-semibold text-[#1C2C46] mb-2">Edit Property</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input className="border rounded-md px-3 py-2" placeholder="Name" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} />
              <input className="border rounded-md px-3 py-2" placeholder="Location" value={form.location} onChange={(e)=>setForm({...form,location:e.target.value})} />
              <input className="border rounded-md px-3 py-2" placeholder="Price" type="number" value={form.price} onChange={(e)=>setForm({...form,price:e.target.value})} />
              <input className="border rounded-md px-3 py-2" placeholder="Builder" value={form.builder} onChange={(e)=>setForm({...form,builder:e.target.value})} />
              <input className="border rounded-md px-3 py-2" placeholder="Contact" value={form.contact} onChange={(e)=>setForm({...form,contact:e.target.value})} />
              <input className="border rounded-md px-3 py-2" placeholder="Discount" value={form.discount} onChange={(e)=>setForm({...form,discount:e.target.value})} />
            </div>
            <textarea className="border rounded-md px-3 py-2 w-full" rows={3} placeholder="Description" value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})} />
            <input className="border rounded-md px-3 py-2 w-full" placeholder="Features" value={form.features} onChange={(e)=>setForm({...form,features:e.target.value})} />
            <label className="block">
              <span className="text-sm text-[#5E6C84]">Images (optional)</span>
              <input type="file" multiple accept="image/*" onChange={(e)=>setForm({...form,images:e.target.files})} className="mt-1 block w-full" />
            </label>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={closeEdit} className="px-4 py-2 rounded-md border">Cancel</button>
              <button type="submit" className="px-4 py-2 rounded-md bg-[#702FB1] hover:bg-[#5e2993] text-white">Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default PropertySubmissions;
