import React, { useState } from 'react';
import { PageTitle } from '@/components/common/PageTitle';
import { CourseList } from '@/features/courses/components/CourseList';
import { useCourses } from '@/features/courses/hooks/useCourses';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';

const CourseBrowsePage = () => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  const { data: coursesResponse, isLoading } = useCourses({ search: debouncedSearch });

  return (
    <div className="space-y-8">
      <PageTitle 
        title="Browse Courses" 
        subtitle="Explore our library of high-quality courses and find your next learning adventure."
      >
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search courses..." 
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </PageTitle>

      <CourseList 
        courses={coursesResponse?.data.data} 
        isLoading={isLoading} 
      />
    </div>
  );
};

export default CourseBrowsePage;
