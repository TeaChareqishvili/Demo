import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function WardrobeData() {
  const [wardrobe, setWardrobe] = useState([]);

  useEffect(() => {
    const fetchWardrobe = async () => {
      const { data, error } = await supabase
        .from("wardrobe")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching wardrobe:", error.message);
      } else {
        setWardrobe(data);
      }
    };

    fetchWardrobe();
  }, []);

  console.log(wardrobe, "data");
  return (
    <div style={{ padding: "2rem" }}>
      <h1>👗 My Wardrobe</h1>
      {wardrobe.length === 0 ? (
        <p>No items yet...</p>
      ) : (
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          {wardrobe.map((item) => (
            <div
              key={item.id}
              style={{ border: "1px solid #ccc", padding: "1rem" }}
            >
              <img
                src={item.image_url}
                alt={item.description}
                width="150"
                style={{ objectFit: "cover", borderRadius: "8px" }}
              />
              <p>
                <strong>{item.description}</strong>
              </p>
              <p>Category: {item.category}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
