
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { HardDrive, AlertCircle, TrendingUp, Trash2, Eye, BarChart3, PieChart as PieChartIcon } from "lucide-react";

const HeapDumpAnalyzer = () => {
  const memoryUsageData = [
    { time: '10:00', heap: 512, nonHeap: 128, eden: 256, survivor: 32, oldGen: 224 },
    { time: '10:05', heap: 678, nonHeap: 145, eden: 334, survivor: 42, oldGen: 302 },
    { time: '10:10', heap: 834, nonHeap: 156, eden: 412, survivor: 48, oldGen: 374 },
    { time: '10:15', heap: 945, nonHeap: 167, eden: 465, survivor: 55, oldGen: 425 },
    { time: '10:20', heap: 1023, nonHeap: 178, eden: 503, survivor: 62, oldGen: 458 },
  ];

  const objectDistribution = [
    { type: 'String', instances: 145623, memory: 45.2, color: '#3B82F6' },
    { type: 'byte[]', instances: 89234, memory: 28.7, color: '#EF4444' },
    { type: 'HashMap', instances: 56789, memory: 12.8, color: '#10B981' },
    { type: 'ArrayList', instances: 34567, memory: 8.9, color: '#F59E0B' },
    { type: 'Object[]', instances: 23456, memory: 4.4, color: '#8B5CF6' },
  ];

  const memoryLeaks = [
    {
      className: 'com.example.CacheManager',
      instances: 45623,
      memoryUsage: '234.5 MB',
      growthRate: '+12%/hour',
      severity: 'high',
      description: 'Potential memory leak in cache implementation'
    },
    {
      className: 'org.springframework.jdbc.Connection',
      instances: 2847,
      memoryUsage: '89.2 MB',
      growthRate: '+8%/hour',
      severity: 'medium',
      description: 'Connection pool not releasing connections properly'
    },
    {
      className: 'java.util.concurrent.ThreadLocal',
      instances: 1234,
      memoryUsage: '23.4 MB',
      growthRate: '+5%/hour',
      severity: 'low',
      description: 'ThreadLocal variables not being cleaned up'
    }
  ];

  const gcAnalysis = [
    { collector: 'G1 Young Gen', collections: 2847, totalTime: '12.3s', avgTime: '4.3ms' },
    { collector: 'G1 Old Gen', collections: 156, totalTime: '45.7s', avgTime: '293ms' },
    { collector: 'G1 Concurrent', collections: 89, totalTime: '23.1s', avgTime: '259ms' },
  ];

  const heapRegions = [
    { name: 'Eden Space', size: 512, used: 387, utilization: 75.6 },
    { name: 'Survivor 0', size: 64, used: 42, utilization: 65.6 },
    { name: 'Survivor 1', size: 64, used: 38, utilization: 59.4 },
    { name: 'Old Generation', size: 1024, used: 756, utilization: 73.8 },
    { name: 'Metaspace', size: 256, used: 189, utilization: 73.8 },
  ];

  return (
    <div className="space-y-6">
      {/* Memory Usage Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {heapRegions.map((region, index) => (
          <Card key={index} className="bg-slate-800/30 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-slate-300">{region.name}</h3>
                <Badge 
                  variant={region.utilization > 80 ? 'destructive' : region.utilization > 60 ? 'secondary' : 'default'}
                  className="text-xs"
                >
                  {region.utilization}%
                </Badge>
              </div>
              <div className="space-y-2">
                <Progress value={region.utilization} className="h-2" />
                <div className="flex justify-between text-xs text-slate-400">
                  <span>{region.used} MB used</span>
                  <span>{region.size} MB total</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="memory-trends" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-slate-700/50">
          <TabsTrigger value="memory-trends" className="data-[state=active]:bg-blue-600">
            <TrendingUp className="h-4 w-4 mr-2" />
            Memory Trends
          </TabsTrigger>
          <TabsTrigger value="object-analysis" className="data-[state=active]:bg-blue-600">
            <PieChartIcon className="h-4 w-4 mr-2" />
            Object Analysis
          </TabsTrigger>
          <TabsTrigger value="leak-detection" className="data-[state=active]:bg-blue-600">
            <AlertCircle className="h-4 w-4 mr-2" />
            Leak Detection
          </TabsTrigger>
          <TabsTrigger value="gc-analysis" className="data-[state=active]:bg-blue-600">
            <Trash2 className="h-4 w-4 mr-2" />
            GC Analysis
          </TabsTrigger>
        </TabsList>

        <TabsContent value="memory-trends" className="mt-6">
          <Card className="bg-slate-800/30 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <HardDrive className="h-5 w-5 mr-2 text-blue-400" />
                Memory Usage Trends
              </CardTitle>
              <CardDescription className="text-slate-400">
                Heap and non-heap memory usage over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={memoryUsageData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="time" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151', 
                      borderRadius: '8px',
                      color: '#F9FAFB'
                    }} 
                  />
                  <Area type="monotone" dataKey="oldGen" stackId="1" stroke="#EF4444" fill="#EF4444" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="eden" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="survivor" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="nonHeap" stackId="2" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.4} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="object-analysis" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-slate-800/30 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-green-400" />
                  Object Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={objectDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="memory"
                    >
                      {objectDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151', 
                        borderRadius: '8px',
                        color: '#F9FAFB'
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/30 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Top Object Types</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {objectDistribution.map((obj, index) => (
                    <div key={index} className="p-3 bg-slate-700/30 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: obj.color }}
                          ></div>
                          <span className="font-medium text-slate-300">{obj.type}</span>
                        </div>
                        <span className="text-white font-bold">{obj.memory}%</span>
                      </div>
                      <div className="text-sm text-slate-400">
                        {obj.instances.toLocaleString()} instances
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="leak-detection" className="mt-6">
          <Card className="bg-slate-800/30 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <AlertCircle className="h-5 w-5 mr-2 text-red-400" />
                Memory Leak Detection
              </CardTitle>
              <CardDescription className="text-slate-400">
                Potential memory leaks and growing object instances
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {memoryLeaks.map((leak, index) => (
                  <div key={index} className={`p-4 rounded-lg border ${
                    leak.severity === 'high' ? 'bg-red-900/20 border-red-800/50' :
                    leak.severity === 'medium' ? 'bg-yellow-900/20 border-yellow-800/50' :
                    'bg-blue-900/20 border-blue-800/50'
                  }`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Badge 
                          variant={leak.severity === 'high' ? 'destructive' : 
                                  leak.severity === 'medium' ? 'secondary' : 'default'}
                          className="text-xs"
                        >
                          {leak.severity.toUpperCase()}
                        </Badge>
                        <span className="font-medium text-white">{leak.className}</span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-slate-400">
                        <span>{leak.memoryUsage}</span>
                        <Badge variant="outline" className="text-xs">{leak.growthRate}</Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                      <div>
                        <span className="text-xs text-slate-400">Instances</span>
                        <p className="text-white font-medium">{leak.instances.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-xs text-slate-400">Memory Usage</span>
                        <p className="text-white font-medium">{leak.memoryUsage}</p>
                      </div>
                      <div>
                        <span className="text-xs text-slate-400">Growth Rate</span>
                        <p className="text-white font-medium">{leak.growthRate}</p>
                      </div>
                    </div>
                    <p className="text-sm text-slate-300">{leak.description}</p>
                    <div className="flex space-x-2 mt-3">
                      <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                        <Eye className="h-4 w-4 mr-2" />
                        Inspect
                      </Button>
                      <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                        Generate Report
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gc-analysis" className="mt-6">
          <Card className="bg-slate-800/30 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Trash2 className="h-5 w-5 mr-2 text-purple-400" />
                Garbage Collection Analysis
              </CardTitle>
              <CardDescription className="text-slate-400">
                GC performance metrics and collection statistics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {gcAnalysis.map((gc, index) => (
                  <div key={index} className="p-4 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium text-white">{gc.collector}</h3>
                      <Badge variant="outline" className="text-xs">
                        {gc.collections} collections
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <span className="text-xs text-slate-400">Total Collections</span>
                        <p className="text-lg font-bold text-white">{gc.collections}</p>
                      </div>
                      <div>
                        <span className="text-xs text-slate-400">Total Time</span>
                        <p className="text-lg font-bold text-white">{gc.totalTime}</p>
                      </div>
                      <div>
                        <span className="text-xs text-slate-400">Average Time</span>
                        <p className="text-lg font-bold text-white">{gc.avgTime}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export { HeapDumpAnalyzer };
