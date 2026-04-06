#!/usr/bin/env python3
import os
import shutil
import glob

base = os.path.dirname(os.path.abspath(__file__))
sim_src = os.path.join(base, 'simulations')
pub_sim = os.path.join(base, 'public', 'simulations')

mapping = {
    '1_Non-Newtonian_planar_Poiseuille_flow': '1_non_newtonian_poiseuille',
    '2_Periodic_Hill': '2_periodic_hill',
    '3_NASA_Wall_Mounted_Hump': '3_nasa_wall_mounted_hump',
    '4_backward_facing_step': '4_backward_facing_step',
    '5_cylinder_vortex_shedding': '5_cylinder_vortex_shedding',
    '6_bouyant_cavity': '6_buoyant_cavity',
    '7_NASA_4412_Trailing_Edge_Separation': '7_naca_4412_trailing_edge',
}

for src_name, dst_name in mapping.items():
    src_dir = os.path.join(sim_src, src_name)
    dst_dir = os.path.join(pub_sim, dst_name)
    os.makedirs(dst_dir, exist_ok=True)

    for f in os.listdir(src_dir):
        if f.endswith('.mp4') or f.endswith('.png'):
            shutil.copy2(os.path.join(src_dir, f), os.path.join(dst_dir, f))
            print(f"Copied: {src_name}/{f} -> {dst_name}/{f}")

# Delete original simulations folder
shutil.rmtree(sim_src)
print("\nDeleted simulations/ folder")
print("Asset migration complete!")
